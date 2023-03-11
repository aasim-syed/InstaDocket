## Getting Started

1. Clone this repo.

2. Create a `.env.local` file with `BANANA_API_KEY=your_api_key` and `BANANA_MODEL_KEY=your_model_key`.

3. Install dependencies:

```bash
npm i
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see your project!

7. Outline of Approach I used. <br>
Referred a lot of API docs, and found out there were so many providers for OpenAI’s whisper.<br>
So I checked and worked it all out. <br>
OpenAI - https://platform.openai.com/docs/guides/speech-to-text<br>
AssemblyAI - https://www.assemblyai.com/docs/walkthroughs#realtime-streaming-transcription<br>
Banana.dev - https://www.banana.dev/ PS this one stood out in terms of performance and cost.<br>
Images - UI<br>
![image](https://user-images.githubusercontent.com/70385414/224476492-8c8c290a-251e-4de8-b7ee-f48f87b33ff3.png)<br>

![image](https://user-images.githubusercontent.com/70385414/224476518-92f1b543-05ce-4497-9f30-94c4b522861f.png)<br>
![image](https://user-images.githubusercontent.com/70385414/224476526-9b030307-3e34-4d99-b3a4-eac078c3f4d6.png)<br>

![image](https://user-images.githubusercontent.com/70385414/224476540-f55c20fa-3997-400f-927c-3470f2585b4d.png)






I tried with all only proper output that gave reliable results was banana.dev ‘s as those are hosted on heavy Tesla V100 GPUs absolute beast.<br>
Others even if was noisey gave korean text sometimes, so meh.<br>
Banana.dev >>>>> , lol<br>
