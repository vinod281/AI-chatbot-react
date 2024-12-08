import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: "********* your_api_key **********",
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
