import os

folder_path = "./audio"
output_file_path = "./output.txt"

with open(output_file_path, "w") as output_file:
    file_names = os.listdir(folder_path)
    for file_name in file_names:
        output_file.write(f':"{file_name}",\n')