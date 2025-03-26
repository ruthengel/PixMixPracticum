import axios from "axios";
import { addCollage } from "./CollageSlice";
class CollageStore {

  getUploadUrl = async (fileName: string, token: string | null) => {
    try {
      const res = await axios.get('https://localhost:7231/api/upload/presigned-url', {
        params: {
          fileName: fileName,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data.url
    }
    catch (error) {

    }
  }

  getDownloadUrl = async (fileName: string, token: string | null) => {
    try {
      const res = await axios.get('https://localhost:7231/api/upload/download-url', {
        params: {
          fileName: fileName,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.data.url
    }
    catch (error) {

    }
  }

  getDeleteUrl = async (fileName: string, token: string | null) => {
    try {
      const res = await axios.get('https://localhost:7231/api/upload/delete-url', {
        params: {
          fileName: fileName,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data.url
    }
    catch (error) {
    }
  }

  uploadCollageToS3 = async (file: File, token: string | null) => {
    try {
      const presignedUrl = await this.getUploadUrl(file.name, token);
      const publicUrl = presignedUrl.split('?')[0];
      console.log("Public URL:", publicUrl);
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },

      });
      alert('הקובץ הועלה בהצלחה!');
      return publicUrl
    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
    }
  }

  downloadCollageFromS3 = async (name: string, token: string | null) => {
    const downloadUrl = this.getDownloadUrl(name, token);
    if (!downloadUrl) {
      console.error("No URL returned from server!");
      return;
    }
    try {
      const fileResponse = await axios.get(await downloadUrl, {
        responseType: 'blob'
      });
      return fileResponse.data
    }
    catch (error) {
      console.error("Error downloading the image:", error);
    }
  }

  deleteCollageFromS3 = async (name: string, token: string | null) => {
    const deleteUrl = this.getDeleteUrl(name, token);
    if (!deleteUrl) {
      console.error("No URL returned from server!");
      return;
    }
    try {
      const fileResponse = await axios.delete(await deleteUrl);
      return fileResponse.data
    }
    catch (error) {
      console.error("Error deletinging the image:", error);
    }
  }

  addCollage = async (file: File, token: string | null, userId: string | null | undefined, url: string, dispatch: any) => {
    try {
      const res = await axios.post('https://localhost:7231/api/Collage',
        {
          name: file.name, userId: userId, collageUrl: url
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      const newCollage = res.data;
      dispatch(addCollage(newCollage));
    } catch (error) {
      console.error('שגיאה בהוספה:', error);
    }
  }
  
  deleteCollage = async (collageId: string, token: string | null) => {
    try {
      const res = await axios.delete(`https://localhost:7231/api/Collage/${collageId}`,
        { headers: { Authorization: `Bearer ${token}` } })
      return res.data
    }
    catch (error) {
      console.error('מחיקת הקולאז נכשלה', error);
    }
  }

  getUserCollages = async (userId: string, token: string | null) => {
    try {
      const res = await axios.get(`https://localhost:7231/api/Collage/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      return res.data
    }
    catch (error) {
      console.error('שגיאה בקבלת הקולאזים:', error);
    }
  }



}

export default new CollageStore()
