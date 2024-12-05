import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
});

export class Assistant{

    #model

    constructor(model = "gpt-4o-mini")
    {
        this.#model = model;
    }

    async chat( content, history)
    {
        try {

            const result = await openai.chat.completions.create({

                model:this.#model,
                messages: [...history,{content,role:"user"}],

            });

            return result.choices[0].message.content;
            
        } catch (error) {

            throw error;
            
        }
    }


}