import { Button, CloseButton, Image ,Container} from "@chakra-ui/react";
import { imagesFromDB } from "schemas/imgSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import UploadImg from "components/img/UploadImg";
import { deleteItem, getItem } from "api/api";

const Images: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: imagenes, isLoading: imagenesCategory } = useQuery<
    imagesFromDB[]
  >({
    queryKey: ["img"],
    queryFn: ()=>getItem('/img'),
  });
  const removeImg = async (id: string) => {
    await deleteItem(id,'/img');
    queryClient.invalidateQueries();
  };
  return (
    <Container minW={'100vh'}>
      <UploadImg />
      <Link href={"/"}>
        <Button color={"gray"}>Volver</Button>
      </Link>
      <div className="grid grid-cols-4">
        {imagenesCategory
          ? "loading"
          : imagenes?.map((i) => (
              <div key={i._id} className="relative inline-block">
                <Image src={i.url} alt={i.title}  />
                <CloseButton
                  onClick={() => {
                    removeImg(i.cloudinaryId);
                  }}
                  className="absolute right-1 top-1 border border-black"
                />
              </div>
            ))}
      </div>
    </Container>
  );
};
 
export default Images;
