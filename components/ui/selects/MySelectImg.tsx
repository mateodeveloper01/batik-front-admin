import { ReactNode, useEffect, useState } from "react";
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
  Flex,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { imagesFromDB } from "schemas/imgSchema";
import { getItem } from "api/api";
import UploadImg from "components/img/UploadImg";

interface Props<T> {
  fieldName: keyof T;
  defaultImageId?: imagesFromDB[];
  isProduct?: boolean;
}

function MySelectImg<T>({
  fieldName,
  defaultImageId,
  isProduct = true,
}: Props<T>) {
  const [selectImgs, setSelectImgs] = useState<imagesFromDB[]>([]);
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading: isLoadingImages } = useQuery<imagesFromDB[]>({
    queryKey: ["img"],
    queryFn: () => getItem("/img"),
  });
  const addImg = (item: imagesFromDB) => {
    if (!selectImgs.some((i) => i._id === item._id)) {
      isProduct ? setSelectImgs([...selectImgs, item]) : setSelectImgs([item]);
    } else {
      setSelectImgs(selectImgs.filter((i) => i._id !== item._id));
    }
  };
  useEffect(() => {
    if (defaultImageId) {
      setSelectImgs(defaultImageId);
    }
  }, [defaultImageId, data, fieldName, setValue]);
  useEffect(() => {
    setValue(
      fieldName as string,
      selectImgs.map((i) => i._id)
    );
  }, [selectImgs]);

  return (
    <FormControl pt={2} isInvalid={!!errors[fieldName as string]}>
      <>
        <FormLabel>Selecciona una o más imágenes</FormLabel>
        <Button borderWidth="1px" onClick={onOpen}>
          Seleccionar
        </Button>
        <Box display="flex" alignItems="center" mt={2}>
          {selectImgs.map((i) => (
            <div key={Math.random()}>
              <Image src={i.url} boxSize="100px" mr={2} />
            </div>
          ))}
        </Box>
      </>

      <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
        <ModalCloseButton />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecciona una o más imágenes</ModalHeader>
          <ModalBody>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {data?.map((o) => (
                <GridItem key={o._id}>
                  <Image
                    src={o.url}
                    alt={o.title}
                    // boxSize="150px"
                    cursor="pointer"
                    borderRadius="md"
                    boxShadow={
                      // console.log('object');
                      selectImgs.includes(o) ? "0 0 0 2px #3182CE" : "none"
                    }
                    onClick={() => addImg(o)}
                  />
                </GridItem>
              ))}
            </Grid>
            <Box py={10}>
              <UploadImg />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <input type="hidden" {...register(fieldName as string)} />
      <FormErrorMessage>
        {errors[fieldName]?.message as ReactNode}
      </FormErrorMessage>
    </FormControl>
  );
}

export default MySelectImg;
