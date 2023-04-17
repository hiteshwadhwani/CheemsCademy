import {
  FormControl,
  FormHelperText,
  Box,
  FormLabel,
  Input,
  Button,
  Text
} from "@chakra-ui/react";
import { useState } from "react";

const CreateCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");

  // module state
  const [numOfModules, setNumOfModules] = useState(1);
  const [moduleName, setModuleName] = useState('')
  const [moduleDescription, setModuleDescription] = useState('')
  const [module, setModule] = useState([]) // {[{'name':'module1', 'description':'module1'}, {'name':'module2', 'description':'module2'}, ..........]}




  const handleSetNumOfModules = (name, description) => {
    const newModule = {'name':name, 'description':description}
    setModule([...module, newModule])
    setModuleName('')
    setModuleDescription('')
    setNumOfModules((prev) => prev+1)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit")
  }
  return (
    <>
      <Box width="50%" marginX="auto" marginY="25px">
        <form>
          <FormControl>
            <FormLabel>name</FormLabel>
            <Input bgColor='white' type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <FormLabel>description</FormLabel>
            <Input bgColor='white' type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <FormLabel>short_description</FormLabel>
            <Input bgColor='white' type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)}/>
            <FormLabel>experience</FormLabel>
            <Input bgColor='white' type="text" value={experience} onChange={(e) => setExperience(e.target.value)} />
            <FormLabel>price</FormLabel>
            <Input bgColor='white' type="number" value={price}  onChange={(e) => setPrice(e.target.value)} />
            <FormLabel>type</FormLabel>
            <Input bgColor='white' type="text" value={type} onChange={(e) => setType(e.target.value)} />

            <FormLabel>module {numOfModules}</FormLabel>
            <Input value={moduleName} type="text" placeholder="name" onChange={(e) => setModuleName(e.target.value)} />
            <Input value={moduleDescription} type="text" placeholder="description" onChange={(e) => setModuleDescription(e.target.value)} />
            
            <Button onClick={() => handleSetNumOfModules(moduleName, moduleDescription)}>add module</Button>
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default CreateCourse;
