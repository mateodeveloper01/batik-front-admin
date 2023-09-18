import { useEffect, useState } from "react";
import {
  FormControl,
  Image,
  Menu,
  MenuButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
  GridItem,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { imagesFromDB } from "~/schemas/imgSchema";
import UploadImg from "~/components/img/UploadImg";
import { getItem } from "~/api/api";



interface Props<T> {
  fieldName: keyof T;
  flex?: number;
  defaultImageId? :string
}

function MySelectImg<T>({ fieldName, flex = 3 ,defaultImageId }: Props<T>) {
  const {
    formState: { errors },
    register,
    setValue,
  } = useFormContext();

  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleImageSelect = (id: string, url: string) => {
    setSelectedImageId(id);
    setSelectedImageUrl(url);
    setValue(fieldName as string, id); 
    onClose(); 
  }
  const { data, isLoading: isLoadingImages } = useQuery<imagesFromDB[]>({
    queryKey: ["img"],
    queryFn: ()=>getItem('/img'),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    // Establecer el valor predeterminado cuando cambia defaultImageId
    if (defaultImageId) {
      const defaultImage = data?.find((o) => o._id === defaultImageId);
      if (defaultImage) {
        setSelectedImageId(defaultImage._id);
        setSelectedImageUrl(defaultImage.url);
        setValue(fieldName as string, defaultImage._id);
      }
    }
  }, [defaultImageId, data, fieldName, setValue]);

  if (isLoadingImages) {
    return <>loading</>;
  }

  return (
    <FormControl flex={flex} paddingBottom={2}>
      <Menu >
        <MenuButton as={Button} rightIcon={<span>&#x25BE;</span>} borderWidth="1px" onClick={onOpen}>
          Seleccionar
        </MenuButton>
        <Box display="flex" alignItems="center" mt={2}>
          {selectedImageId && selectedImageUrl && (
            <>
              <Image src={selectedImageUrl} alt="Selected" boxSize="30px" mr={2} />
              <Button onClick={() => setSelectedImageId(null)}>Cancelar selección</Button>
            </>
          )}
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Selecciona una imagen</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="flex flex-col gap-4">
              <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                {data?.map((o) => (
                  <GridItem key={o._id}>
                    <Image
                      src={o.url}
                      alt={o.title}
                      boxSize="150px"
                      cursor="pointer"
                      borderRadius="md"
                      boxShadow={selectedImageId === o._id ? "0 0 0 2px #3182CE" : "none"}
                      onClick={() => handleImageSelect(o._id, o.url)}
                    />
                  </GridItem>
                ))}
               
              </Grid>
              <UploadImg/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Menu>
      <input type="hidden" {...register(fieldName as string)} />
    </FormControl>
  );
}

export default MySelectImg;
