import ast

def extract_imports(file_path):
    with open(file_path, "r") as file:
        tree = ast.parse(file.read())

    imports = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                imports.add(alias.name)
        elif isinstance(node, ast.ImportFrom):
            module_name = node.module
            for alias in node.names:
                imports.add(f"{module_name}.{alias.name}")

    return imports

def generate_requirements(files):
    all_imports = set()
    for file_path in files:
        imports = extract_imports(file_path)
        all_imports.update(imports)

    return sorted(all_imports)

if __name__ == "__main__":
    python_files = ["autodebug.py", "colorsme.py", "llm.py", "last_command.py"]

    requirements = generate_requirements(python_files)

    with open("requirements.txt", "w") as requirements_file:
        for package in requirements:
            requirements_file.write(f"{package}\n")
