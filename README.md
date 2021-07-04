# All-In-One Command

    deno run --allow-write https://raw.githubusercontent.com/UserJHansen/Virus-Modelling-in-Deno/master/index.js; pip3 install matplotlib numpy; python3 jsoninterpretter/index.py

## Requirements

- [Deno](https://github.com/denoland/deno/releases/)
- [Python](https://www.python.org/downloads/release/latest)

## Compilation

### Windows

    deno compile --unstable --allow-all --lite --output VirusSimulation --target x86_64-pc-windows-msvc index.js

### Mac (x64)

    deno compile --unstable --allow-all --lite --output VirusSimulation --target x86_64-apple-darwin index.js

### Mac (M1)

    deno compile --unstable --allow-all --lite --output VirusSimulation --target aarch64-apple-darwin index.js

### Linux

    deno compile --unstable --allow-all --lite --output VirusSimulation --target x86_64-unknown-linux-gnu index.js

### Web and NodeJS

    deno bundle index.js > NodeJs.js

## Graph Generation

    pip3 install matplotlib numpy; python3 jsoninterpretter/index.py
