
export const POST = async (req) => {

    if (req.method !== 'POST') {
        return new Response('Method should be POST',{staus:405});
    }
    else {
      try {
        const { model,messages } = await req.json();;
        var data = {
            model: model,
            messages: messages
        }

        const url = 'https://api.openai.com/v1/chat/completions';
        const headers = {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        }

        const response = await fetch(url, {
            method: 'POST', 
            headers: headers, 
            body: JSON.stringify(data), 
          })
        const result = await response.json()
        return new Response(JSON.stringify(result), { status: 200 })
        
        } catch (error) {
            return new Response("Failed to fetch all Tool", { status: 500 })
        }
    }
    
  }