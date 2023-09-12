<?php
$servername = "localhost";
$username = "aethoria";
$password = "Test1234!";
$dbname = "aethoria";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
if 
$sql = "SELECT id, title, note, port FROM notes";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = mysqli_fetch_assoc($result)) {
  	echo "<div> <p>Title: " . $row["title"]. "</p> <p>Note: " . $row["note"]. "</p> <p>Port: " . $row["port"]. "</div>";
  }
} else {
  echo "0 results";
}
mysqli_close($conn);
?>
