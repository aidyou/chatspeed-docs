---
title: A Brief Discussion on SSE and Streamable HTTP in MCP Protocol
description: An in-depth exploration of the pros and cons of SSE and Streamable HTTP streaming transmission schemes in MCP protocol, with particular focus on the issue of SSE connection disconnection after computer hibernation, and an explanation of why Streamable HTTP is recommended.
keywords: MCP protocol, SSE, Streamable HTTP, streaming transmission, AI Agent, connection stability, protocol selection, pros and cons
---

## 📖 Introduction

While developing the `MCP` module for [Chatspeed](https://github.com/aidyou/chatspeed), we initially assumed that `SSE` could automatically handle everything: such as maintaining connections for long periods and automatically reconnecting after disconnections.

The beauty of this design lies in the fact that the library layer encapsulates all network state management, allowing developers to focus solely on business logic without dealing with underlying network details. However, in practice, we often encountered inexplicable unavailability issues. When tested with `MCP` development tools, the server was clearly functioning properly. Later, we discovered that network disconnections and computer hibernation could all cause `410` (`Gone`) errors.

Initially, we didn't pay much attention, but after encountering this issue repeatedly, we started to wonder "why." Through research, we found that this was caused by a combination of computer system mechanisms and the `SSE` protocol. When computer systems (whether `macOS`, `Windows`, or `Linux`) hibernate (sometimes called suspend), they disconnect most `HTTP` connections to save power. To maintain long-term connections, both sides of the `SSE` protocol maintain heartbeats, and after a certain period without receiving a heartbeat, the `SSE` server assumes the client has left, initiating the resource recycling process to clean up the `session id`. When the computer resumes, the `SSE` client reconnects, but since the server has already cleaned up the `session id`, a `410` (`Gone`) error occurs.

The "stateless" nature of the `Streamable HTTP` protocol naturally resolves this issue with `SSE`, which is why `Chatspeed` has introduced the `Streamable HTTP` protocol.

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

To address the limitations of `SSE`, the `MCP` protocol introduced `HTTP Streamable`. It is not a traditional "streaming HTTP" but a transmission mechanism with multiple features designed to provide more robust and flexible streaming communication.

### 💡 Core Concepts of Streamable HTTP:

- **Based on standard HTTP requests**: Clients initiate communication through standard `HTTP` `POST`/`GET` requests.
- **Optional SSE upgrade**: Servers can upgrade responses to `SSE` streams as needed to achieve streaming capabilities.
- **Decentralization and statelessness**: Does not require persistent connections, supporting stateless server architectures and reducing server maintenance costs.

### ✨ Advantages of `Streamable HTTP`:

- **Stateless server support**: No need to maintain highly available long connections, resulting in higher server resource utilization and easier scalability.
- **Pure `HTTP` implementation**: Excellent compatibility with existing `HTTP` infrastructure (such as middleware, proxies, load balancers), making deployment and integration smoother.
- **Connection recoverability**: `Streamable HTTP` better handles connection interruptions and data retransmission. Even in cases of unstable networks or client state changes (such as waking up after computer hibernation), it can more reliably restore communication and avoid context loss. **In `Chatspeed`, we spent considerable time adding and testing `Streamable HTTP`, and results showed it completely solved the post-hibernation usability issues, significantly improving user experience.**
- **Flexibility**: Servers can choose whether to use `SSE` for streaming responses based on actual needs, providing greater flexibility.
- **Backward compatibility**: As a progressive improvement over HTTP+SSE transmission methods, it maintains good backward compatibility with legacy `SSE` clients.

## 📝 Summary and Recommendations

SSE server unavailability is sometimes not the problem of the **server side** itself, but rather due to **network interruption** exceeding the `keep-alive` time, after which the server performs normal resource recycling, causing the `Session ID` to become invalid when the client attempts to connect with the original `Session ID`, resulting in a `410` error.

`Streamable HTTP` is an important optimization of the `MCP` protocol's transport layer. Building upon the advantages of the original `HTTP`+`SSE` model, it successfully addresses issues such as irrecoverable connections, heavy long-connection burdens, and inflexible transmission, bringing higher availability, flexibility, and stability.

For `AI Agent` developers, **it is strongly recommended to prioritize the `Streamable HTTP` protocol**. It effectively avoids the pain point of `SSE` connection disconnection after computer hibernation, ensuring that `AI Agent` can provide stable and smooth service experiences across various usage scenarios. **`Chatspeed`'s practice proves that `Streamable HTTP` is a reliable solution to these issues.** Through `Streamable HTTP`, we can build more robust and reliable `AI Agent` applications, making AI a truly capable assistant in our work and life.

Currently, [Chatspeed](https://chatspeed.aidyou.ai)'s `MCP` proxy has added the `Streamable HTTP` protocol. To maintain compatibility with existing users, the `SSE` protocol is still retained, but we still strongly recommend that `Chatspeed` users migrate to the `Streamable HTTP` protocol as soon as possible. In a future version we may completely remove the `SSE` protocol. The migration process is simple: just change `/mcp/sse` to `/mcp/http` in the `MCP` proxy address.

If you're interested in the `Chatspeed MCP` proxy, you can visit the [MCP Proxy](../../mcp/) section for detailed information.
