import express from 'express';
import {getProverbs, saveProverbs} from '../utils/fileHelpers.js';



const router = express.Router();

export default (upload) =>{

        router.get('/proverbs',(req,res)=>{
            const proverbs = getProverbs();
            res.json(proverbs);
        });

        router.get('/proverbs/:id',(req,res)=>{
            const proverbs = getProverbs();
            const id = parseInt(req.params.id);

            const Pverb = proverbs.find(function(p){
                return p.id === id; 
            });
            //res.json.id(proverbs); 
            if(!Pverb){
                return res.status(404).json({message: "proverb not found"});
            }
            res.json(Pverb);
        });


        ///////////////////// adding new proverb/////////////////////////////////
        router.post('/proverbs', (req,res)=>{
            const proverbs =getProverbs();
            const newId = proverbs.length>0 ? Math.max(...proverbs.map(p => p.id))+1 : 1 ;

            const {textDari, textPashto, translationEn, meaning, category } =req.body;

            const newProverb ={
                id : newId,
                textDari,
                textPashto,
                translationEn,
                meaning,
                category
            };
            proverbs.push(newProverb);

            saveProverbs(proverbs); 

            res.status(201).json({message: "proverbs was added ", newProverb});

         });

         //////////////////////// updateing any data//////////////////////////////////////
        router.put('/proverbs/:id', (req,res)=>{
            
            const proverbs = getProverbs();
            const id = parseInt(req.params.id);//taking id
            
            if(isNaN(id) || id < 1){//making sure if it exists
                return res.status(400).json({message: "the id should be greater then 0 "})
            }
            const index = proverbs.findIndex(function(p){
                return p.id === id; 
            });
            // const car = cars.find(c=>c.id === req.params.id) try to change like this once
            if(index === -1){
                return res.status(404).json({message: "the Proverb is not found"}); 
            }
            
            const updatedProverb = { ...proverbs[index], ...req.body, id};
            proverbs[index] = updatedProverb; 
            console.log(req.body);

            saveProverbs(proverbs);
            res.json({message : "proverb is updated!!!", updatedProverb}); 

         });



         /// to delete one proverb; ////////////////////////////////////////////////////
        router.delete('/proverbs/:id', (req,res)=>{
            const proverbs = getProverbs();
            const id = parseInt(req.params.id);
           
            if(isNaN(id) || id < 1){
                return res.status(400).json({message: "the id should be greater then 0 "});
            }
            const Index = proverbs.findIndex(function(p){//finding index of that element with specific id
                return p.id === id; 
            });
            //delete that one
            proverbs.splice(Index, 1);

            saveProverbs(proverbs);//saving the changes
            res.json({message: "proverb deleted !!"});

        ////////////////show random proverb/////////////////////////
        router.get('/random',(req,res)=>{
            const proverbs = getProverbs();
            const proverbIndex = Math.floor(Math.random()*proverbs.length);
            const randomProverb = proverbs[proverbIndex]; 
            res.json(randomProverb);
        } );


    });
    return router;
}