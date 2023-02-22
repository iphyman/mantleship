import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  RefObject,
} from "react";
import Image from "next/image";

export interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fileTypes?: string;
  ref: RefObject<HTMLInputElement> | undefined | null;
  preview: string | null;
  resetFile: () => void;
  width?: string;
  height?: string;
}

const fileUpload: ForwardRefRenderFunction<
  HTMLInputElement,
  FileUploadProps
> = ({ label, fileTypes, preview, width, height, resetFile, ...rest }, ref) => {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <FormHelperText>{fileTypes}</FormHelperText>
      <Flex
        flexDir="column"
        width={width}
        height={height}
        alignItems="center"
        justifyContent="center"
        border="1px"
        borderRadius="1rem"
        borderStyle="dashed"
        position="relative"
        marginTop="1rem"
        overflow="hidden"
      >
        <input
          type="file"
          className={preview ? "d-none" : ""}
          accept="image/*"
          multiple={false}
          style={{
            display: "inline-block",
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            zIndex: 1,
          }}
          {...rest}
          ref={ref}
        />
        {preview && (
          <IconButton
            onClick={resetFile}
            aria-label="reset"
            icon={<AiOutlineClose />}
            position="absolute"
            top="0rem"
            right="0rem"
            zIndex={2}
          />
        )}
        {!preview ? (
          <>
            <Text>Drag and drop file or click to browse file</Text>
            <Icon boxSize="60px" as={AiOutlineCloudUpload} />
          </>
        ) : (
          <Flex w="full" h="full" position="relative" id="preview" zIndex="-1">
            <Image src={preview} alt="preview" fill />
          </Flex>
        )}
      </Flex>
    </FormControl>
  );
};

export const FileUpload = forwardRef(fileUpload);
