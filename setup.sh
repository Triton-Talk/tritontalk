echo "Installing dependencies"

npm --prefix backend/ install
npm --prefix client/ install

scp jack@tritontalk.com:~/.env backend/.env

echo "To run: do npm run dev in both client/ and backend/ folders (in 2 different terminals)"
