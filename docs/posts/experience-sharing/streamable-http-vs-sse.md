---
title: A Brief Discussion on SSE and Streamable HTTP in MCP Protocol
description: An in-depth exploration of the pros and cons of SSE and Streamable HTTP streaming transmission schemes in MCP protocol, with particular focus on the issue of SSE connection disconnection after computer hibernation, and an explanation of why Streamable HTTP is recommended.
keywords: MCP protocol, SSE, Streamable HTTP, streaming transmission, AI Agent, connection stability, protocol selection, pros and cons
---

## 📖 Introduction

While developing the `MCP` module for [Chatspeed](https://chatspeed.aidyou.ai), we initially assumed that `SSE` could automatically handle everything: such as maintaining connections for long periods and automatically reconnecting after disconnections.

The beauty of this design lies in the fact that the library layer encapsulates all network state management, allowing developers to focus solely on business logic without dealing with underlying network details. However, in practice, we often encountered inexplicable unavailability issues. When tested with `MCP` development tools, the server was clearly functioning properly. Later, we discovered that network disconnections and computer hibernation could all cause `410` (`Gone`) errors.

Initially, we didn't pay much attention, but after encountering this issue repeatedly, we started to wonder "why." Through research, we found that this was caused by a combination of computer system mechanisms and the `SSE` protocol. When computer systems (whether `macOS`, `Windows`, or `Linux`) hibernate (sometimes called suspend), they disconnect most `HTTP` connections to save power. To maintain long-term connections, both sides of the `SSE` protocol maintain heartbeats, and after a certain period without receiving a heartbeat, the `SSE` server assumes the client has left, initiating the resource recycling process to clean up the `Session ID`. When the computer resumes, the `SSE` client reconnects, but since the server has already cleaned up the `Session ID`, a `410` (`Gone`) error occurs.

**It's worth noting that the `Streamable HTTP` protocol itself cannot "naturally" solve this issue with `SSE`.** Although it provides a more flexible transmission mechanism, after server restarts or long disconnections, if session state is not properly managed, `Streamable HTTP` will also return `401` (`Unauthorized`) or `410` (`Gone`) errors due to the client's `Session ID` expiring, depending on the MCP server implementation. **This indicates that, whether using `SSE` or `Streamable HTTP`, the core issue lies in the persistence and management of session states.** This is also the fundamental reason why `Chatspeed` later decided to refactor the session manager.

> Different MCP servers (development frameworks) may return different error codes. For example, the `Session ID` expiration error code for `SSE` protocol in `rmcp0.7` is `410`, while for `Streamable HTTP`, it's `401`. Regardless of the error, the fundamental cause is `Session ID` expiration.

## 📊 SSE Protocol: Advantages and Limitations

`Server-Sent Events (SSE)` is a mechanism that allows servers to push updates unidirectionally to clients. It is based on the standard `HTTP` protocol and sends event streams through a persistent `HTTP` connection.

### ✅ Advantages of SSE:

- **Simple to use**: `SSE` is based on `HTTP` and requires no complex handshake process, making implementation relatively simple. Native browser support makes front-end integration convenient.
- **Unidirectional real-time updates**: Perfect for servers to push real-time data to clients, such as chat messages, notifications, or progress updates.

### ❌ Limitations of SSE:

Despite performing well in certain scenarios, `SSE` has some significant limitations, especially in scenarios requiring high stability and long connections like `AI Agent`:

- **Connection irrecoverability**: This is one of the most frustrating issues with `SSE`. **In practical use with `Chatspeed`, we were troubled for a long time by the issue of `SSE` becoming unusable after computer hibernation.** When the `SSE` connection between client and server is unexpectedly interrupted (for example, **computer hibernation, network fluctuations, or client restarts**), the `SSE` connection cannot automatically recover. The client must re-initiate the connection, and if the client itself lacks automatic reconnection functionality, users must manually refresh or reconnect, resulting in a disjointed experience and even leading users to believe there's an issue with the `Chatspeed MCP` proxy server. For `AI Agent`, this significantly reduces tool availability, and for people without technical background or research in `MCP` protocol, all these issues appear to be problems with the `Chatspeed MCP` proxy server.
- **Long connection resource consumption**: Servers need to maintain a long-open `HTTP` connection for each client. In large-scale deployments, this consumes substantial server resources and increases server burden.
- **Unidirectional communication**: `SSE` is unidirectional, with data flowing only from server to client. If clients need to send data to the server, they must use additional `HTTP` `POST` requests, increasing communication complexity.
- **Compatibility issues with modern infrastructure**: Some middleware, proxies, and load balancers provide poor support for long-held `HTTP` connections, potentially causing `SSE` connections to become unstable or be accidentally closed.

## 🚀 Streamable HTTP Protocol: Next-Generation Streaming

To address the limitations of `SSE`, the `MCP` protocol introduced `Streamable HTTP`. It is not a traditional "streaming HTTP" but a transmission mechanism with multiple features designed to provide more robust and flexible streaming communication.

### 💡 Core Concepts of Streamable HTTP:

- **Based on standard HTTP requests**: Clients initiate communication through standard `HTTP` `POST`/`GET` requests.
- **Optional SSE upgrade**: Servers can upgrade responses to `SSE` streams as needed to achieve streaming capabilities.
- **Decentralization and statelessness**: Does not require persistent connections, supporting stateless server architectures.

### ✨ Advantages of `Streamable HTTP`:

- **Stateless server support**: No need to maintain highly available long connections, resulting in higher server resource utilization and easier scalability.
- **Pure `HTTP` implementation**: Excellent compatibility with existing `HTTP` infrastructure (such as middleware, proxies, load balancers), making deployment and integration smoother.
- **Connection recoverability (requires session management)**: `Streamable HTTP` provides a more flexible transmission mechanism, offering a better foundation for implementing connection recoverability. However, to truly achieve seamless recovery after connection interruptions and avoid `401` or `410` errors, **it must be combined with server-side session management mechanisms**. By persisting session states, even after server restarts or brief network interruptions, clients can use old `Session IDs` to reconnect and resume sessions without reinitialization. This greatly enhances user experience and tool availability.
- **Flexibility**: Servers can choose whether to use `SSE` for streaming responses based on actual needs, providing greater flexibility.
- **Backward compatibility**: As a progressive improvement over HTTP+SSE transmission methods, it maintains good backward compatibility with legacy `SSE` clients.

## 📝 Summary and Recommendations

SSE server unavailability is sometimes not the problem of the **server side** itself, but rather due to **network interruption** exceeding the `keep-alive` time, after which the server performs normal resource recycling, causing the `Session ID` to become invalid when the client attempts to connect with the original `Session ID`, resulting in a `410` error.

**Whether using `SSE` or `Streamable HTTP`, without a robust session management mechanism, both may result in clients receiving `401` (`Unauthorized`) or `410` (`Gone`) errors after server restarts or long disconnections.** The core reason for these errors lies in the server-side loss of client session states.

### 💡 Solution: Introducing Session Management

It's worth noting that in the `rmcp0.7` framework, `SSE` protocol session management is implemented with direct hardcoding, making it very difficult to extend for persistent session support. However, the `Streamable HTTP` protocol reserves extensible session management interfaces, which provides possibilities for us to implement custom persistent session management. Therefore, `Chatspeed` currently only implements session persistence functionality for the `Streamable HTTP` protocol.

To completely solve this problem, the core lies in implementing **persistent session management**. The general approach is as follows:

1. **Session state persistence**: The server no longer stores session information solely in memory but writes it to persistent storage (such as databases, file systems). Session information typically includes session ID, creation time, expiration time, etc.
2. **Session validity period and cleanup**: Set a reasonable validity period for each session. The server needs a background task to regularly scan and clean up expired sessions to prevent storage from growing indefinitely.
3. **Session recovery mechanism**: When clients reconnect with an old but unexpired session ID, the server can read the session information from persistent storage and "revive" the corresponding session state, allowing it to continue processing requests without requiring the client to reinitialize.
4. **Client transparency**: For the client, the session recovery process should be transparent; it doesn't need to perceive the server's restart or session reconstruction.

By introducing such a session management mechanism, we can greatly enhance the robustness and user experience of `AI Agent` applications, ensuring stable and smooth service in various complex network environments.

**Reference implementation of session management under Rust `rmcp` framework:** [src-tauri/src/mcp/server/persistent_session.rs](https://github.com/aidyou/chatspeed/blob/main/src-tauri/src/mcp/server/persistent_session.rs)

`Streamable HTTP` is an important optimization of the `MCP` protocol's transport layer. It retains the advantages of the original `HTTP`+`SSE` model and, by **combining with a robust session management mechanism**, successfully addresses issues such as irrecoverable connections, heavy long-connection burdens, and inflexible transmission, bringing higher availability, flexibility, and stability.

For `AI Agent` developers, **it is strongly recommended to prioritize the `Streamable HTTP` protocol and ensure robust session management is implemented**. It effectively avoids the pain point of connection disconnection after computer hibernation, ensuring that `AI Agent` can provide stable and smooth service experiences across various usage scenarios. Through `Streamable HTTP` and session management, we can build more robust and reliable `AI Agent` applications, making AI a truly capable assistant in our work and life.

Currently, [Chatspeed](https://chatspeed.aidyou.ai)'s `MCP` proxy has added `Streamable HTTP` protocol and implemented efficient session management that ensures automatic session recovery after network disconnection or computer hibernation (within 7 days). To maintain compatibility with existing users, the `SSE` protocol is still retained, but we still strongly recommend that `Chatspeed` users migrate to the `Streamable HTTP` protocol as soon as possible. In a future version we may completely remove the `SSE` protocol. The migration process is simple: just change `/mcp/sse` to `/mcp/http` in the `MCP` proxy address.

If you're interested in the `Chatspeed MCP` proxy, you can visit the [MCP Proxy](../../mcp/) section for detailed information.
