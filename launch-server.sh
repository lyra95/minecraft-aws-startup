# root유저로 변환
sudo su -

yum update

# java 다운로드
yum install java-1.8.0-openjdk.x86_64

mkdir /opt/Minecraft

cd /opt/Minecraft

wget https://launcher.mojang.com/v1/objects/0a269b5f2c5b93b1712d0f5dc43b6182b9ab254e/server.jar