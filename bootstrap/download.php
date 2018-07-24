<?php
error_reporting(E_ERROR | E_PARSE);
$servername = "localhost";
$username = "root"; 
$password1= "root"; 
$dbname = "cmpe280"; 

$fname = $_POST["fname"];
$lname = $_POST["lname"];
$email = $_POST["email"];



$conn = mysqli_connect($servername, $username, $password1, $dbname);
if (!$conn) 
{
	die("Connection failed: " . mysqli_connect_error());
	echo "failed";
}


$sql = "INSERT INTO `userdetails` VALUES ('$fname','$lname','$email')";

if($conn->query($sql))
{
	  $conn->close();

	  //download file script

     $response_data = array("status"=>200,"msg"=>"Kudos!! Your feedback has been submitted.");
     header('Content-Type: application/json');
    echo json_encode($response_data);
    
}
else
{
	$conn->close();
   $response_data = array("status"=>200,"msg"=>"Error in submitting feedback");
    header('Content-Type: application/json');
    echo json_encode($response_data);
}

?>