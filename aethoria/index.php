<?php
$servername = "localhost";
$username = "aethoria";
$password = "Test1234!";
$dbname = "aethoria";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
//if (!empty($_GET['delete'])) {
//  $stmt = $conn->prepare("DELETE FROM notes WHERE id=(id) VALUES (?)");
//  $stmt->bind_param("i", $id);
//  $id = $_GET["delete"]
//  $stmt->execute();
//  $stmt->close();
}
$sql = "SELECT id, title, note, port FROM notes";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = mysqli_fetch_assoc($result)) {
    echo "<div> <a href=\"index.php?delete=" . $row["id"] . "\" >Delete</a> <p>Titel: " . $row["title"]. "</p> <p>Notiz: " . $row["note"]. "</p> <p>Port:" . $row["port"]. "</p> </div>";
  }
} else {
  echo "0 results";
}

mysqli_close($conn);
?>
