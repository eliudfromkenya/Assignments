export const getResults = async (response: Response): Promise<any> => {
    if(response.status === 401) 
        throw new Error('You are not authorized, please contact system administrator');
    else if (!response.ok){
        try {
            const data = await response.json();
            return data;
        }catch{
           return response.statusText;        
        }
      }
        throw new Error('Error occured');
    }
