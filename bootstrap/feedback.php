<?php
error_reporting(E_ERROR | E_PARSE);
$servername = "localhost";

$username = "root"; 
$password1= "root"; 
$dbname = "cmpe280"; 

$name = $_POST["name"];
$email = $_POST["email"];
$number = $_POST["phonenumber"];
$comments = $_POST["comments"];



$conn = mysqli_connect($servername, $username, $password1, $dbname);
if (!$conn) 
{
	die("Connection failed: " . mysqli_connect_error());
	echo "failed";
}


$sql = "INSERT INTO `feedback` VALUES ('$name','$email','$number','$comments')";
if($conn->query($sql))
{
	  $conn->close();
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