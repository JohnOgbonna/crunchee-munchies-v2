//components/supporting_components/items/adminItemCard.tsx
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { item } from '@/app/typesAndInterfaces/orderTypes';
import AdminItemVariants from './adminItemVariants';
import { useState } from 'react';
import { updateItemInDb, deleteItemFromDb } from '@/app/lib/db/updateItemInDB';  // Assuming deleteItemFromDb exists
import { toast, Toaster } from 'sonner';
import AdminItemImageEditor from './adminImageEditor';

type AdminItemCardProps = {
    item: item;
};

const MAX_TITLE_LENGTH = 60;
const MAX_DESC_LENGTH = 250;

const AdminItemCard = ({ item }: AdminItemCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleSave = async () => {
        if (!title.trim() || !description.trim()) {
            toast.error('Title and description cannot be empty.', {
                position: 'top-center',
            });
            return;
        }

        if (title === item.name && description === item.description) {
            toast.info('No changes detected.');
            setIsEditing(false);
            return;
        }

        try {
            await updateItemInDb(item.id, { name: title, description });
            toast.success('Item updated successfully!', {
                position: 'top-center',
            });
            item.name = title;
            item.description = description;
            setIsEditing(false);
        } catch (error: any) {
            toast.error(`Failed to update item: ${error.message}`, {
                position: 'top-center',
            });
        }
    };

    const handleClickEdit = () => {
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
        }
    }

    const cancelEdit = () => {
        setIsEditing(false);
        setTitle(item.name);
        setDescription(item.description);
    }

    const handleDelete = async () => {
        setShowDeleteConfirmation(false);  // Close confirmation modal
        try {
            await deleteItemFromDb(item.id);  // Assuming you have a function to handle deletion
            toast.success('Item deleted successfully!', {
                position: 'top-center',
            });
        } catch (error: any) {
            toast.error(`Failed to delete item: ${error.message}`, {
                position: 'top-center',
            });
        }
    };

    return (
        <div key={item.id} className="border rounded-xl bg-white shadow-sm p-4">
            <Toaster richColors={true} position='top-center' />
            <div className="flex flex-col md:flex-row md:items-stretch gap-4">
                <div className={`w-full md:w-40 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden py-2 md:py-4 px-2 ${isExpanded ? 'md:w-auto' : ''}`}>
                    <AdminItemImageEditor
                        currentImageUrl={item.heroImage}
                        itemId={item.id}
                        isEditing={isEditing}
                        onImageUploadSuccess={async (newUrl) => {
                            try {
                                await updateItemInDb(item.id, { heroImage: newUrl });
                                toast.success('Image updated!');
                                item.heroImage = newUrl;
                            } catch (err: any) {
                                toast.error(`Failed to update image in DB: ${err.message}`);
                            }
                        }}
                    />

                </div>

                <div className="flex-1">
                    <div className={!isEditing ? "flex justify-between p-2 gap-x-3 items-start" : "flex flex-col p-2 gap-y-6 items-start"}>
                        <div className={!isEditing ? "space-y-1 max-w-[450px]" : "space-y-2 w-full max-w-[600px]"}>
                            {isEditing ? (
                                <>
                                    <div className='mb-2 flex flex-col gap-y-1'>
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            maxLength={MAX_TITLE_LENGTH}
                                            className="text-xl font-semibold text-slate-800 border border-slate-300 rounded w-full px-2 py-1"
                                        />
                                        <p className="text-xs text-red-500">
                                            {title.length}/{MAX_TITLE_LENGTH} characters
                                        </p>
                                    </div>
                                    <div className='mb-2 flex flex-col gap-y-1'>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            maxLength={MAX_DESC_LENGTH}
                                            rows={3}
                                            className="text-sm text-slate-700 border border-slate-300 rounded w-full px-2 py-1"
                                        />
                                        <p className="text-xs text-red-500">
                                            {description.length}/{MAX_DESC_LENGTH} characters
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-semibold text-slate-700">{item.name}</h2>
                                    <p className="text-sm text-slate-700">{item.description}</p>
                                </>
                            )}
                            <p className="text-xs text-slate-500">Type: {item.type}</p>
                        </div>

                        <div className={!isEditing ? "text-right flex flex-col justify-center gap-2" : "text-right flex flex-row justify-center w-full gap-4 max-w-[450px] md:max-w-[600px]"}>
                            <button
                                className={`text-sm font-bold px-2 py-1 rounded text-white ${isEditing ? 'bg-green-600' : 'bg-blue-600'}`}
                                onClick={handleClickEdit}
                            >
                                {isEditing ? 'Done Editing' : 'Edit Item'}
                            </button>
                            {
                                isEditing && (
                                    <button
                                        className="text-sm bg-orange-600 text-white font-bold px-2 py-1 rounded"
                                        onClick={cancelEdit}
                                    >
                                        {"Cancel Edit"}
                                    </button>
                                )
                            }
                            <button
                                className="text-sm bg-orange-600 text-white font-bold px-2 py-1 rounded"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? 'Hide Variants' : 'Show Variants'}
                            </button>

                            {/* Conditionally render Delete button */}
                            {item.allowDelete && (
                                <button
                                    className="text-sm bg-red-600 text-white font-bold px-2 py-1 rounded"
                                    onClick={() => setShowDeleteConfirmation(true)}
                                >
                                    Delete Item
                                </button>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 overflow-hidden"
                            >
                                <AdminItemVariants variants={item.size_variants} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Delete confirmation modal */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <p className="text-xl mb-4">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-green-600 text-white font-bold px-4 py-2 rounded"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="bg-gray-600 text-white font-bold px-4 py-2 rounded"
                                onClick={() => setShowDeleteConfirmation(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminItemCard;
