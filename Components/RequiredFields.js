import React from "react";
import { Heading, Box } from "native-base";
 const RequiredFields = () =>
{
  return(<><Box  p="5" bg="amber.100" shadow={4}>
  <Heading size="md" color="danger.500">
Please fields marked with <Heading size="lg" color="danger.700">*</Heading> are required
  </Heading>
</Box>
</>);
}

export default RequiredFields