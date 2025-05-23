
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
