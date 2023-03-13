import argparse
import os

parser = argparse.ArgumentParser()
parser.add_argument('-n', '--name', required=True, help='component name')
args = parser.parse_args()

# Convert component name to lowercase
trdir_name = args.name.lower()
trdir_names = trdir_name + 's'

# Check if component directory exists
dir_path = f'./src/components/{args.name}'
if not os.path.exists(dir_path):
    os.mkdir(dir_path)

# Create component JSX file
jsx_path = f'{dir_path}/{args.name}.jsx'
with open(jsx_path, 'w') as f:
    f.write(f'''import React from 'react';
import './{args.name}.css';

function {args.name}(props) {{
  return (
    <div className="{args.name}">
      <div className="{trdir_name}">
        <h1>{args.name}</h1>
      </div>
    </div>
  );
}}

export default {args.name};
''')

# Create component CSS file
css_path = f'{dir_path}/{args.name}.css'
open(css_path, 'a').close()

print(f"Created directory '{args.name}' with '{jsx_path}' and '{css_path}'.")

# Modify App.jsx file
app_path = './src/App/App.jsx'
with open(app_path, 'r') as f:
    lines = f.readlines()

# Find the line number where the import statement should be inserted
index_import = 0
for i, line in enumerate(lines):
    if line.startswith("import './App.css'"):
        index_import = i
        break

# Insert the new import statement before the found line
with open(app_path, 'w') as f:
    lines.insert(index_import, f"import {args.name} from \"../components/{args.name}/{args.name}\";\n")
    f.writelines(lines)

print(f"Inserted import statement into '{app_path}'.")

# Find the line number where the map statement should be inserted
index_map = 0
for i, line in enumerate(lines):
    if line.startswith('export default App'):
        index_map = i - 4
        break

# Insert the new import statement before the found line
with open(app_path, 'w') as f:
    lines.insert(index_map, f"      <{args.name} />\n")
    f.writelines(lines)

print(f"Inserted map statement into '{app_path}'.")
