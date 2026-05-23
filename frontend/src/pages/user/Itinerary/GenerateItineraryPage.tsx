import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import {
  UploadCloud,
  FileText,
  ImageIcon,
  X,
  Loader2,
  Map,
} from 'lucide-react';

import { uploadTravelDocument } from '@/services/upload.service';

const GenerateItineraryPage =
  () => {
    const navigate =useNavigate();

    const [ file, setFile ] =useState<File | null>(null );
    const [ loading,setLoading] =useState(false);
    const [localError,setLocalError] = useState('');

    const handleFileChange =
      (
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        const selectedFile =  e.target.files?.[0];

        if (!selectedFile ){
          return;

        }

        const allowedTypes =
          [
            'application/pdf',
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
          ];

        if ( !allowedTypes.includes( selectedFile.type ) ) {
          setLocalError( 'Only PDF and image files are allowed');
          return;
        }
        setLocalError('');
        setFile(selectedFile );
      };

    const handleDrop =(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const droppedFile = e .dataTransfer.files?.[0];

        if (!droppedFile)
          return;

        const allowedTypes =
          [
            'application/pdf',
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
          ];

        if (!allowedTypes.includes( droppedFile.type )) {
          setLocalError(
            'Only PDF and image files are allowed'
          );
          return;
        }
        setLocalError('');
        setFile(droppedFile );
      };

    const handleUpload = async () => {
        if (!file) {
          setLocalError( 'Please select a file' );
          return;
        }
        try {
          setLoading( true  );

          const response =  await uploadTravelDocument( file );

          toast.success( 'Itinerary generated successfully' );
          navigate(`/itineraries/${response.data.id}`   );
        } catch (error) {
          console.log(error);

          toast.error( 'Failed to generate itinerary' );
        } finally {
          setLoading( false  );
        }
      };

    return (
      <div className="min-h-screen bg-background px-4 py-10 font-poppins flex items-center justify-center">
        <div className="w-full max-w-4xl bg-card rounded-[20px] shadow-lg border border-border p-8">
          <div className="text-center mb-8">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
              <Map className="text-primary w-10 h-10" />
            </div>

            <h1 className="text-3xl font-bold text-primary">
              Generate Travel
              Itinerary
            </h1>

            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Upload flight
              tickets, hotel
              bookings, or
              travel documents
              to generate your
              AI-powered travel
              itinerary.
            </p>
          </div>

          {localError && (
            <p className="text-sm text-danger text-center mb-4">
              {
                localError
              }
            </p>
          )}

          <div
            onDragOver={(
              e
            ) =>
              e.preventDefault()
            }
            onDrop={
              handleDrop
            }
            className="border-2 border-dashed border-border rounded-[20px] p-12 bg-muted text-center transition hover:border-primary hover:bg-primary/5"
          >
            <label className="cursor-pointer flex flex-col items-center justify-center">
              <div className="bg-primary/10 p-5 rounded-full mb-5">
                <UploadCloud className="w-12 h-12 text-primary" />
              </div>

              <h2 className="text-xl font-semibold text-foreground">
                Drag & Drop
                or Click to
                Upload
              </h2>

              <p className="text-sm text-muted-foreground mt-2">
                PDF, PNG,
                JPG, JPEG &
                WEBP supported
              </p>

              <input
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={
                  handleFileChange
                }
              />
            </label>
          </div>

          {file && (
            <div className="mt-6 bg-muted rounded-[16px] p-4 flex items-center justify-between border border-border">
              <div className="flex items-center gap-4">
                {file.type ===
                'application/pdf' ? (
                  <FileText className="text-danger" />
                ) : (
                  <ImageIcon className="text-success" />
                )}

                <div>
                  <p className="font-medium text-foreground">
                    {
                      file.name
                    }
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {(
                      file.size /
                      1024 /
                      1024
                    ).toFixed(
                      2
                    )}{' '}
                    MB
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setFile(
                    null
                  )
                }
                className="text-danger hover:opacity-80"
              >
                <X
                  size={
                    18
                  }
                />
              </button>
            </div>
          )}

          <button
            onClick={
              handleUpload
            }
            disabled={
              !file ||
              loading
            }
            className="w-full mt-6 bg-primary text-white py-4 rounded-[16px] font-medium hover:opacity-90 transition disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Generating
                Itinerary...
              </>
            ) : (
              'Generate Itinerary'
            )}
          </button>
        </div>
      </div>
    );
  };

export default GenerateItineraryPage;
// import { useState } from 'react';
// import { toast } from 'sonner';
// import { UploadCloud, FileText, ImageIcon, X } from 'lucide-react';
// import { uploadTravelDocument } from '@/services/upload.service';

// const GenerateItineraryPage = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [localError, setLocalError] = useState('');

//   const handleFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const selectedFile = e.target.files?.[0];

//     if (!selectedFile) return;

//     const allowedTypes = [
//       'application/pdf',
//       'image/png',
//       'image/jpeg',
//       'image/jpg',
//       'image/webp',
//     ];

//     if (!allowedTypes.includes(selectedFile.type)) {
//       setLocalError('Only PDF and image files are allowed');
//       return;
//     }

//     setLocalError('');
//     setFile(selectedFile);
//   };

//   const handleDrop = (
//     e: React.DragEvent<HTMLDivElement>
//   ) => {
//     e.preventDefault();

//     const droppedFile = e.dataTransfer.files?.[0];

//     if (!droppedFile) return;

//     const allowedTypes = [
//       'application/pdf',
//       'image/png',
//       'image/jpeg',
//       'image/jpg',
//       'image/webp',
//     ];

//     if (!allowedTypes.includes(droppedFile.type)) {
//       setLocalError('Only PDF and image files are allowed');
//       return;
//     }

//     setLocalError('');
//     setFile(droppedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setLocalError('Please select a file');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await uploadTravelDocument(file);

//       console.log(response);

//       toast.success('Document uploaded successfully');
//     } catch (error) {
//       console.log(error);

//       toast.error('Upload failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background px-4 py-10 font-poppins flex items-center justify-center">
//       <div className="w-full max-w-4xl bg-card rounded-lg shadow-lg p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-primary">
//             Upload Travel Booking
//           </h1>

//           <p className="text-muted-foreground mt-2">
//             Upload flight tickets, hotel bookings or travel documents
//             to generate your AI itinerary
//           </p>
//         </div>

//         {localError && (
//           <p className="text-sm text-danger text-center mb-4">
//             {localError}
//           </p>
//         )}

//         <div
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={handleDrop}
//           className="border-2 border-dashed border-border rounded-lg p-10 bg-muted text-center transition hover:border-primary"
//         >
//           <label className="cursor-pointer flex flex-col items-center justify-center">
//             <div className="bg-primary/10 p-4 rounded-full mb-4">
//               <UploadCloud className="w-10 h-10 text-primary" />
//             </div>

//             <h2 className="text-lg font-semibold text-foreground">
//               Drag & Drop or Click to Upload
//             </h2>

//             <p className="text-sm text-muted-foreground mt-2">
//               Supports PDF, PNG, JPG, JPEG & WEBP
//             </p>

//             <input
//               type="file"
//               accept=".pdf,image/*"
//               className="hidden"
//               onChange={handleFileChange}
//             />
//           </label>
//         </div>

//         {file && (
//           <div className="mt-6 bg-muted rounded-lg p-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {file.type === 'application/pdf' ? (
//                 <FileText className="text-danger" />
//               ) : (
//                 <ImageIcon className="text-success" />
//               )}

//               <div>
//                 <p className="font-medium text-foreground">
//                   {file.name}
//                 </p>

//                 <p className="text-sm text-muted-foreground">
//                   {(file.size / 1024 / 1024).toFixed(2)} MB
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={() => setFile(null)}
//               className="text-danger hover:opacity-80"
//             >
//               <X size={18} />
//             </button>
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           disabled={!file || loading}
//           className="w-full mt-6 bg-primary text-white py-3 rounded hover:opacity-90 transition disabled:opacity-50"
//         >
//           {loading
//             ? 'Uploading...'
//             : 'Generate Itinerary'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GenerateItineraryPage;