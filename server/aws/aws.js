const {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
  ListBucketsCommand,
  S3Client,
} = require('@aws-sdk/client-s3');

// const s3 =  S3({
//     accessKeyId: '',
//     secretAccessKey: '',
// })

const client = new S3Client({
  credentials: {
    accessKeyId: 'AKIATSWAQXS2MMP2OFMP',
    secretAccessKey: '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',
  },
  region: 'eu-north-1',
});

const uploadAudio = async (filename, bucketname, file) => {
  // const bucketName = "test-bucket";
  // const key = "multipart.txt";

  let uploadId;

  try {
    const multipartUpload = await client.send(
      new CreateMultipartUploadCommand({
        Bucket: bucketname,
        Key: filename,
      }),
    );

    uploadId = multipartUpload.UploadId;

    const uploadPromises = [];


    const partSize = Math.ceil(file.length / 5);

    // Upload each part.
    for (let i = 0; i < 5; i++) {
      const start = i * partSize;
      const end = start + partSize;
      uploadPromises.push(
        client
          .send(
            new UploadPartCommand({
              Bucket: bucketname,
              Key: filename,
              UploadId: uploadId,
              Body: file.subarray(start, end),
              PartNumber: i + 1,
            }),
          )
          .then((d) => {
            console.log("Part", i + 1, "uploaded");
            return d;
          }),
      );
    }

    const uploadResults = await Promise.all(uploadPromises);

    console.log(uploadResults);

    return await client.send(
      new CompleteMultipartUploadCommand({
        Bucket: bucketname,
        Key: filename,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: uploadResults.map(({ ETag }, i) => ({
            ETag,
            PartNumber: i + 1,
          })),
        },
      }),
    );


    
  } catch (err) {
    console.error(err);

    if (uploadId) {
      const abortCommand = new AbortMultipartUploadCommand({
        Bucket: bucketname,
        Key: filename,
        UploadId: uploadId,
      });

      await s3Client.send(abortCommand);
    }
  }
  

  // return new Promise((resolve, reject) => {
  //     const params = {
  //         Key: filename,
  //         Bucket: bucketname,
  //         Body: file,
  //         ContentType: 'audio/mpeg',
  //         ACL: 'public-read'
  //     }

  //     s3.upload(params, (err, data) => {
  //         if (err) {
  //             reject(err)
  //         } else {
  //             resolve(data.Location)
  //         }
  //     })
  // })
};

module.exports = uploadAudio;
