import {OpenAI, OpenAiApi, Configuration} from 'openai';
//import {OpenAiApi, Configuration} from 'openai';
import { firestore } from '../firebase'; 
import { collection, doc, getDocs } from 'firebase/firestore';


export default async function handler(req,res) {
    if(req.method === 'GET') {
        try {
            const snapshot = collection(firestore, 'inventory');
            const docs = await getDocs(snapshot);
            const inventoryList = [];
            docs.forEach((doc) => {
                inventoryList.push(doc.id);
            });
            
            const configuration = new Configuration({
                apikey: process.env.OPENAI_API_KEY,
            });
            const openai = new OpenAiApi(configuration);

            const prompt = "Here is a list of ingredients: ${inventoryList.join(', ')}. Suggest some recipes I can make with these ingredients."

            const response = await openai.createCompletion({
                model: 'text-davinici-003',
                prompt: prompt,
                max_tokens: 150,
            });

            const recipes = response.data.choices[0].text.trim().split('\n').filter(line => line);


            res.status(200).json({ recipes });
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json({error: 'Failed to fetch recipes'});
        }
    }
    else {
        res.status(405).json({message: 'Method not allowed'});
    }
}