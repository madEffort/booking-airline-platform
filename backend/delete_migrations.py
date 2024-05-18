import os

apps_path = 'api'

for app in os.listdir(apps_path):

    app_migrations_path = os.path.join(apps_path, app, 'migrations')

    if os.path.exists(app_migrations_path):
        for filename in os.listdir(app_migrations_path):
            if '_initial.py' in filename:
                file_path = os.path.join(app_migrations_path, filename)
                os.remove(file_path)
                print(f"Deleted: {file_path}")
    else:
        print(f"No migrations directory found for {app}")