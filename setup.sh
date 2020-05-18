echo "Installing dependencies"

npm --prefix backend/ install
npm --prefix client/ install

scp jack@tritontalk.com:~/.env backend/.env
scp jack@tritontalk.com:~/tritontalk-d063d-a82351d39ace.json backend/utils/tritontalk-d063d-a82351d39ace.json

echo "To run: do npm run dev in both client/ and backend/ folders (in 2 different terminals)"
