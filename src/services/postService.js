const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`

export const index = async () => {
    try {
        const response = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        
        const data = await response.json()
        
        if(data.err){
            throw new Error(data.err)
        }
        
        return data
    } catch (error) {
        console.log(error)
    }
}

export const show = async (postId) => {
    try {
        const response = await fetch(`${BASE_URL}/${postId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        if(data.err){
            throw new Error(data.err)
        }
        return data
    } catch (error) {
        console.log(error);
    }
}

export const create = async (formData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if(data.err){
            throw new Error(data.err)
        }
        return data
    } catch (error) {
        console.log(error);
    }
}

export const update = async (postId, postFormData) => {
    try {
        const response = await fetch(`${BASE_URL}/${postId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postFormData)
        })
        const data = await response.json()
        if(data.err){
            throw new Error(data.err)
        }
        return data
    } catch (error) {
        console.log(error);
        
    }
}

export const deletePost = async (postId) => {
    try {
        const response = await fetch(`${BASE_URL}/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        if(data.err) throw new Error(data.err)
        return data
    } catch (error) {
        console.log(error);
        
    }
}