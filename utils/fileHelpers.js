import fs from 'fs';
export const getProverbs =()=>{
    //return JSON.parse(fs.readFileSync('Proverbs.json','utf-8'));
    const data = fs.readFileSync('proverbs.json', 'utf8');
    return JSON.parse(data);
}
export const saveProverbs = (posts) =>{
    fs.writeFileSync('Proverbs.json',JSON.stringify(posts, null, 2));
}

// function getProverbs() {
//     const data = fs.readFileSync('proverbs.json', 'utf8');
//     return JSON.parse(data);
//   } we can go wiht this style also fist initalize and assign the data; then use parse