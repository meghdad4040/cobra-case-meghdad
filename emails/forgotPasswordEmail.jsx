import { Html, Button, Heading, Text } from "@react-email/components";


const forgotPasswordEmail = ({ params }) => {
 return (
  <Html lang="en" dir="ltr">
   <Heading as="h2">Hello {params.name}</Heading>
   <Text>We received the reset password request. if it's not you then pls ignore it.</Text>
   <Button pX={20} pY={20} href={params.url} style={{ background: "#000", color: "#ffcf" }}>
    Click
   </Button>
  </Html>
 );
};

export default forgotPasswordEmail;