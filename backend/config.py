import os
from dotenv import load_dotenv

load_dotenv()
PROJECT_ROOT = os.getenv("PROJECT_ROOT")

if __name__ == "__main__":
    print("[config.py] PROJECT_ROOT:", PROJECT_ROOT)
