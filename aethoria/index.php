<?php
echo "hi"
$servername = "localhost";
$username = "aethoria";
$password = "Test1234!";
$dbname = "aethoria";
echo "hi"
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT id, title, note, port FROM notes";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "<div><p>Title: " . $row["title"]. "</p> <p>Note: " . $row["note"]. "</p> <p>Port: " . $row["port"]. "<p/> </div>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>
