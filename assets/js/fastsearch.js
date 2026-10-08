/* ==========================================================================
   fastsearch.js — 覆盖主题同名资源
   --------------------------------------------------------------------------
   Hugo 的资源查找优先根目录 assets/，其次才是主题的 assets/。
   把本文件放在这里即可完整替换主题实现，无需对主题做任何字符串打补丁。

   相对主题原版（themes/PaperMod/assets/js/fastsearch.js）的两处必要修改：

   1. 索引路径
      原版写死为相对路径 "../index.json"：
        首页   /            → /index.json         正常
        文章页 /posts/xxx/   → /posts/index.json  404
      这正是该搜索框原本只能用于首页的根因。本站在全站顶栏常驻搜索框，
      必须改成与域名无关、且正确指向站点根的地址。

   2. 加载时机
      原版用 window.onload 触发索引加载。该事件要等【所有】子资源就绪才触发，
      而本站文章页嵌有 giscus 第三方 iframe；当它加载缓慢或被网络阻断时，
      document.readyState 会长期停在 interactive，window.onload 始终不触发，
      fuse 实例永远不会建立——搜索框看起来正常却完全没有反应。
      改用 DOMContentLoaded，DOM 就绪即加载索引，不再被第三方资源拖住。

   其余逻辑（键盘导航、结果渲染、清空按钮）与主题保持一致。

   【维护提示】主题升级后如需同步上游改动，对照
   themes/PaperMod/assets/js/fastsearch.js 手动合并本文件即可。
   ========================================================================== */

import * as params from '@params';

let fuse; // holds our search engine
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let first, last, current_elem = null
let resultsAvailable = false;

/* 加载搜索索引。
   站点根路径写法：absolute 由 Hugo 注入会有域名绑定问题，纯相对路径在
   子页面会解析错，因此统一用「以 / 开头」的站点根地址。 */
function loadSearchIndex() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data) {
                    // fuse.js options; check fuse.js website for details
                    let options = {
                        distance: 100,
                        threshold: 0.4,
                        ignoreLocation: true,
                        keys: [
                            'title',
                            'permalink',
                            'summary',
                            'content'
                        ]
                    };
                    if (params.fuseOpts) {
                        options = {
                            isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
                            includeScore: params.fuseOpts.includescore ?? false,
                            includeMatches: params.fuseOpts.includematches ?? false,
                            minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
                            shouldSort: params.fuseOpts.shouldsort ?? true,
                            findAllMatches: params.fuseOpts.findallmatches ?? false,
                            keys: params.fuseOpts.keys ?? ['title', 'permalink', 'summary', 'content'],
                            location: params.fuseOpts.location ?? 0,
                            threshold: params.fuseOpts.threshold ?? 0.4,
                            distance: params.fuseOpts.distance ?? 100,
                            ignoreLocation: params.fuseOpts.ignorelocation ?? true
                        }
                    }
                    fuse = new Fuse(data, options); // build the index from the json file
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', '/index.json');
    xhr.send();
}

/* 用 DOMContentLoaded 而非 window.onload：
   window.onload 会被 giscus 等第三方 iframe 拖住甚至永不触发。 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSearchIndex);
} else {
    // 脚本以 defer 加载时 DOM 可能已就绪，直接执行
    loadSearchIndex();
}

function activeToggle(ae) {
    document.querySelectorAll('.focus').forEach(function (element) {
        // rm focus class
        element.classList.remove("focus")
    });
    if (ae) {
        ae.focus()
        document.activeElement = current_elem = ae;
        ae.parentElement.classList.add("focus")
    } else {
        document.activeElement.parentElement.classList.add("focus")
    }
}

function reset() {
    resultsAvailable = false;
    resList.innerHTML = sInput.value = ''; // clear inputbox and searchResults
    sInput.focus(); // shift focus to input box
}

/* 搜索框可能不存在（例如后续改版移除顶栏搜索），这里做存在性保护，
   避免整个脚本因访问 null 而中断。 */
if (sInput) {
    // execute search as each character is typed
    sInput.onkeyup = function (e) {
        // run a search query (for "term") every time a letter is typed
        // in the search box
        if (fuse) {
            let results;
            if (params.fuseOpts) {
                results = fuse.search(this.value.trim(), { limit: params.fuseOpts.limit }); // the actual query being run using fuse.js along with options
            } else {
                results = fuse.search(this.value.trim()); // the actual query being run using fuse.js
            }
            if (results.length !== 0) {
                // build our html if result exists
                let resultSet = ''; // our results bucket

                for (let item in results) {
                    resultSet += `<li><a href="${results[item].item.permalink}" aria-label="${results[item].item.title}">${results[item].item.title}&nbsp;»</a></li>`
                }

                resList.innerHTML = resultSet;
                resultsAvailable = true;
                first = resList.firstChild;
                last = resList.lastChild;
            } else {
                resultsAvailable = false;
                resList.innerHTML = '';
            }
        }
    }

    sInput.addEventListener('search', function (e) {
        // clicked on x
        if (!this.value) reset()
    })
}

// kb bindings
document.onkeydown = function (e) {
    let key = e.key;
    let ae = document.activeElement;

    let box = document.getElementById("searchbox");
    if (!box || !sInput) { return }
    let inbox = box.contains(ae)

    if (ae === sInput) {
        let elements = document.getElementsByClassName('focus');
        while (elements.length > 0) {
            elements[0].classList.remove('focus');
        }
    } else if (current_elem) ae = current_elem;

    if (key === "Escape") {
        reset()
    } else if (!resultsAvailable || !inbox) {
        return
    } else if (key === "ArrowDown") {
        e.preventDefault();
        if (ae == sInput) {
            // if the currently focused element is the search input, focus the <a> of first <li>
            activeToggle(resList.firstChild.lastChild);
        } else if (ae.parentElement != last) {
            // if the currently focused element's parent is last, do nothing
            // otherwise select the next search result
            activeToggle(ae.parentElement.nextSibling.lastChild);
        }
    } else if (key === "ArrowUp") {
        e.preventDefault();
        if (ae.parentElement == first) {
            // if the currently focused element is first item, go to input box
            activeToggle(sInput);
        } else if (ae != sInput) {
            // if the currently focused element is input box, do nothing
            // otherwise select the previous search result
            activeToggle(ae.parentElement.previousSibling.lastChild);
        }
    } else if (key === "ArrowRight") {
        ae.click(); // click on active link
    }
}
