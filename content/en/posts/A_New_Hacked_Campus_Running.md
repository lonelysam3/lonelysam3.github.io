---
title: "Campus Run Tech"
date: 2026-10-09T11:22:00+08:00
draft: false

categories: ["教程"]
tags: ["校园跑"]

summary: "A very new campus run tech"

description: ""

series: ["校园科技"]
seriesOrder: 1        # 可选。系列内序号；不填则按发布日期排序。

ShowToc: true
---

## Download the SDK

`https://github.com/skh2945932142/RunningByeBye/blob/main/dev/CQUPT-Sports-SDK-%E4%BD%BF%E7%94%A8%E6%80%BB%E7%BB%93.md`

This guide is primarily based on this tutorial

A few things to note:

1. You cannot directly access [github.com/Auto-CQUPT-Plan/CQUPT-Sports-SDK](https://github.com/Auto-CQUPT-Plan/CQUPT-Sports-SDK)—it will return a 404 error. You must install it using Go.
2. Go is a standalone program and is not built into Windows. Use a VPN to go to https://go.dev/dl/, download it, and add it to your environment variables.
3. Before installation, run `go mod init <enter any name you like>` in the SDK installation directory.
4. Go’s installation dependencies are hosted overseas. Before installing, run `go env -w GOPROXY=https://goproxy.cn,direct` to use a mirror in China

## Preparing the Main Program

1. Run `git clone https://github.com/skh2945932142/RunningByeBye.git` to clone the main program

2. Once complete, run `cd RunningByeBye` to enter the main program directory

3. Run `go run main.go` to execute the main program

## Obtaining the OpenID

### 1. Install Yakit

Download and install from the official website: [Yak Project | Open-Source Cybersecurity Infrastructure](https://www.yaklang.com/)

After installation, launch Yakit once, select “Security Expert Mode,” and keep the GUI running in the background without closing it

### 2. Install the CA Certificate

The CA certificate file is located in the Yakit installation directory, for example, `D:\yakit\yakit-projects\yak-mitm-ca.crt`

If you don’t see it, skip to Section 4.4. In the top-right corner of the Yakit interface, next to “Launch without configuration,” there is a certificate download option

1. Double-click `yak-mitm-ca.crt`
2. Click “Install Certificate” → Select “Local Computer” as the storage location
3. Click “Next,” then select “Place all certificates in the following store” → ‘Browse’ → “Trusted Root Certification Authorities”
4. Confirm the security warning

The storage location must be “Trusted Root Certification Authorities.” If installed in the “Personal” store, packet capture will fail, and the error message will not be clear

After installation, you can verify it using `certmgr.msc`: Trusted Root Certification Authorities → Certificates; you should see
an entry for `CN=Yakit MITM Root CA`

### 3. Configure the System Proxy

1. In the Settings at the top of the Yakit page, locate “System Proxy,” enable it, and note the port number
2. Press the Windows key to search for “Proxy Server Settings” → Open the proxy settings page
3. Enable “Use a proxy server” and ensure the port listed under “Use a proxy server” matches the Yakit system proxy port

### 4. Start MITM Packet Capture

1. Return to the Yakit homepage and create a new temporary project
2. Click “MITM Interactive Interception” on the left
3. Verify the proxy listening port; it should match the port in Settings > System Proxy
4. Click “Start Interception”

### 5. Capture the OpenID

1. Keep Yakit running. Completely exit WeChat, then reopen it and log in with the WeChat account you use for running

2. Launch the Campus Run mini-program in WeChat

3. Return to Yakit and locate a request that looks like this

   `https://sport.cqupt.edu.cn/new_wxapp/wxUnifyId/checkBinding?wxCode=xxxxxxxx`

4. Click on this packet; you’ll see the `openid` field in the Response. Copy it

### 6. Troubleshooting Steps When Packets Cannot Be Captured

In order of likelihood from highest to lowest:

| Symptom                                                      | Possible Cause                          | Resolution                                                   |
| ------------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------ |
| No records at all in Yakit                                   | System proxy not configured             | Repeat steps 3 and 4                                         |
| No records at all in Yakit                                   | System proxy occupied by other programs | Close software that may be using the system proxy (e.g., Steam++, VPNs, etc.) |
| Only `CONNECT`, no request content                           | HTTPS not decrypted                     | Enable forced HTTPS packet capture; verify that the CA is installed in the Trusted Root Certificate Store |
| Mini-program spins indefinitely / displays a network error   | Incorrect CA certificate location       | Reinstall it in the Trusted Root Certificate Store           |
| Can capture traffic from other apps, but not the mini-program | Mini-program runs as a separate process | After confirming the system proxy is active, completely exit WeChat, restart it, and re-enter the mini-program |
| Cannot access the internet after capturing traffic           | System proxy not restored               | Revert to the original settings or disable the proxy server  |

## Launch the runner via the command line

| Command                                   | Function                             |
| ----------------------------------------- | ------------------------------------ |
| `login <openid>`                          | Log in and retrieve user information |
| `run start <openid> -f <venue> -p <pace>` | Start a run                          |
| `run resume <openid>`                     | Resume a run                         |
| `run stop <openid>`                       | Stop a run                           |
| `task <openid>`                           | Query task details                   |
| `records <openid> [Semester]`             | View workout records                 |
| `recover`                                 | Resume an unfinished run task        |

1. On first launch, run `go run ./cmd/commandline login <openid>` to bind the captured OpenID.
   You won’t need to rebind it on subsequent launches. If you see your name, student ID, and other details in the output, the binding was successful; otherwise, repeat the steps in the “Obtaining OpenID” section to capture it again.

2. Run `go run ./cmd/commandline run start <openid> -f Fenghua Athletic Field -p 6.0`
   to start a run at a pace of 6 minutes per kilometer at Fenghua Athletic Field.

   `-f` optional venue: `Fenghua Athletic Field` / `Taiji Athletic Field` / `Ningjingyuan`

   `-p`: Pace; enter `0` for random

   `-i`: Interval (in seconds) between location reports; enter `0` for automatic

3. It’s recommended to have someone in your dorm help execute the command line—it takes a lot of courage to stand on the track with a laptop, scanning faces

## Create a Front-End Page (Optional)

Have the AI Agent read this project folder and create a front-end page

Use GitHub Student Plan to get a free server from Microsoft Azure, then upload the front-end page so you can view it on your phone while on the track
