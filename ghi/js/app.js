window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences';

    try{
        const response = await fetch(url);
        
        if (!response.ok) {
            console.error("Fix this.")
        } else{
            const data = await response.json();
        }
    }catch (e){
    console.error("Check your JS")
    }
    
});
