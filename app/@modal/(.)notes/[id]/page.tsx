import Modal from "@/components/Modal/Modal";
import NotePreview from "./NotePreview.client";


type ModalPageProps = {
  params: Promise<{ id: string }>;
};

 async function ModalNote({ params }: ModalPageProps) {
  const { id } = await params; 

  return (
    <Modal>
      <NotePreview id={id} />
    </Modal>
  );
}

export default ModalNote