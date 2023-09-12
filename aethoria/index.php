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
if (!empty($_GET['delete'])) {
  $id = $_GET["delete"]; // Get the ID to delete

  // Prepare and execute the DELETE query
  $sql = "DELETE FROM notes WHERE id = ?";
  $stmt = mysqli_prepare($conn, $sql);
  mysqli_stmt_bind_param($stmt, "i", $id);
  
  if (mysqli_stmt_execute($stmt)) {
    echo "Record with ID $id has been deleted successfully.";
  } else {
    echo "Error deleting record: " . mysqli_error($conn);
  }
  
  mysqli_stmt_close($stmt);
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
