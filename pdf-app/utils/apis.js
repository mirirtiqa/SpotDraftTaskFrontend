
import axios from 'axios';

export const signupReq = async ({ name, email, password }) => {
  try{
    await axios.post('http://localhost:5000/api/auth/signup', {
      name,
      email,
      password,
    });

  }
  catch(error){
    console.error("Error during signup:", error);
  }
    
  };

  export const loginReq = async ({ email, password }) => {

    try{
      const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });
    return res;
    }
    catch(error){
      console.error("Error during login:", error);
    }
  }


  export const uploadPDFReq = async (formData) => {
    try{
      const token = localStorage.getItem('token');

      const res = await axios.post('http://localhost:5000/api/pdf/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const newPdf = res.data.pdf;
      return newPdf;
    }
    catch(error){
      console.error("Error during uploading PDF:", error);
    }
  }

export const fetchPDFsReq = async () =>{

  try{
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/pdf/getpdfs', {
            headers: { Authorization: `Bearer ${token}` },
          });
    return res.data
  }
  catch(error){
    console.error("Error during fetching PDFs:", error);
  }
}

export const fetchPDF = async(id)=>{
  try{
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/pdf/getpdf/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    const pdf =  res.json();
    return pdf;

  }
  catch(error){
    console.error("Error during fetching PDF:", error);
  }
}

export const fetchSharedPDF = async(sharedToken)=>{
  try{
    const res = await fetch(`http://localhost:5000/api/pdf/shared/${sharedToken}`);
    const pdf = await res.json();
    return pdf;
  }
  catch(error){
    console.error("Error during fetching PDF:", error);
  }
}



export const getPDFUrl = async (gcsFileName) => {
  try {
    const token = localStorage.getItem('token');
    console.log("token at getpdfurl is", token);
    const res = await fetch(`http://localhost:5000/api/pdf/getpdfurl/${gcsFileName}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response is", res);

    if (!res.ok) throw new Error("Failed to fetch PDF URL");

    const data = await res.json();
    return data.url;
  } catch (error) {
    console.error("Error fetching PDF URL:", error);
  }
}
export const getSharedPDFUrl = async (gcsFileName,sharedToken) => {
  try {
    const res = await fetch(`http://localhost:5000/api/pdf/getsharedpdfurl/${sharedToken}/${gcsFileName}`);

    if (!res.ok) throw new Error("Failed to fetch PDF URL");

    const data = await res.json();
    return data.url;
  } catch (error) {
    console.error("Error fetching PDF URL:", error);
  }
}

export const getShareLink = async (pdfId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/pdf/share/${pdfId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!res.ok) {
        console.error("Failed to fetch share link");
        return;
    }
    const data = await res.json();
    return data.link;
}

export const getComments = async (pdfId) => {

    console.log(pdfId)
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/comments/get/${pdfId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
  
    );

    const data = await res.json();
    return data.comments;
}

export const getSharedPDFComments = async (pdfId, sharedToken) => {

    console.log(pdfId)
    const res = await fetch(`http://localhost:5000/api/comments/get/${sharedToken}/${pdfId}`);
    if (!res.ok) {
        console.error("Failed to fetch comments");
        return;
    }
    const data = await res.json();
    return data.comments;
}

export const addComment = async (pdfId, content, authorName) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`http://localhost:5000/api/comments/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        authorName: authorName,
        pdfId: pdfId,
      }),
    });
    if (!res.ok) {
      console.error("Failed to add comment");
      return;
    }

    const data = await res.json();

    return data.comment;


}



export const addCommentOnShared = async (pdfId, content, authorName,sharedToken) => {

    const res = await fetch(`http://localhost:5000/api/comments/add/onshared`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        authorName: authorName,
        pdfId: pdfId,
        sharedToken: sharedToken,
      }),
    });
    if (!res.ok) {
      console.error("Failed to add comment");
      return;
    }

    const data = await res.json();

    return data.comment;


}
