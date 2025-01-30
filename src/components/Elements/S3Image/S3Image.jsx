import React, { useState, useEffect } from "react";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import ImagePlaceholder from "@/Icons/ImagePlaceholder";

const S3Image = ({ s3Url, alt, className, onFileSize, onFileContent }) => {
  const [base64, setBase64] = useState(null);
  const [fileSize, setFileSize] = useState(0);

  // Initialize the S3 client
  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
  });

  useEffect(() => {
    if (s3Url) {
      fetchImageFromS3(s3Url);
    }
  }, [s3Url]);

  const extractBucketAndKeyFromUrl = (s3Url) => {
    const url = new URL(s3Url);
    const bucketName = url.hostname.split(".")[0];
    const objectKey = decodeURIComponent(url.pathname.substring(1));
    return { bucketName, objectKey };
  };

  const fetchImageFromS3 = async (s3Url) => {
    try{
      if (Object.keys(s3Url).length > 0) {
        const { bucketName, objectKey } = extractBucketAndKeyFromUrl(s3Url);

        try {
          const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
          });

          // Send command to S3
          const response = await s3Client.send(command);
          if (onFileSize) {
            const contentLength = response.ContentLength;
            setFileSize(contentLength);

            // If a callback is provided, send the file size

            onFileSize(contentLength);
          }

          // Convert the response body (ReadableStream) to base64
          const base64String = await streamToBase64(response.Body);
          setBase64(base64String);

          if(onFileContent){
            onFileContent(base64String);
          }
        } catch (err) {
          console.error("Error fetching or processing S3 object:", err);
        }
      }
    }
    catch(error){
      console.log("AWS S3 Error");
      console.log(error);
    }
  };

  // Function to convert a ReadableStream to base64 in the browser
  const streamToBase64 = async (stream) => {
    const reader = stream.getReader();
    const chunks = [];

    let done, value;
    while (!done) {
      ({ done, value } = await reader.read());
      if (value) {
        chunks.push(value);
      }
    }

    const blob = new Blob(chunks);
    return await blobToBase64(blob);
  };

  // Helper function to convert a Blob to base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <>
      {base64 ? (
        <img src={base64} alt={alt} className={`object-cover ${className}`} />
      ) : (
        <div className={`object-cover flex items-center justify-center ${className}`}>
          <ImagePlaceholder />
        </div>
      )}
    </>
  );
};

export default S3Image;
