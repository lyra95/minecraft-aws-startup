import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Set this with your friends IPs
const group = new aws.ec2.SecurityGroup("Minecraft group", {
    // friens to server
    ingress: [
        { protocol: "tcp", fromPort: 25535, toPort:25535, cidrBlocks: ["114.199.141.138/32"] }, // 나
        { protocol: "tcp", fromPort: 25535, toPort:25535, cidrBlocks: ["218.158.70.233/32"] },  // 관우
        { protocol: "tcp", fromPort: 25535, toPort:25535, cidrBlocks: ["210.107.131.84/32"] },    // 재훈
    ],

    // server to friends
    egress: [
        { protocol: "tcp", fromPort: 25535, toPort:25535, cidrBlocks: ["114.199.141.138/32"] }, // 나
        { protocol: "tcp", fromPort: 25535, toPort:25535, cidrBlocks: ["218.158.70.233/32"] },  // 관우
        { protocol: "tcp", fromPort: 25535, toPort:25535, cidrBlocks: ["210.107.131.84/32"] },    // 재훈
    ]
});

const server = new aws.ec2.Instance("webserver-www", {
    instanceType: size,
    vpcSecurityGroupIds: [ group.id ], // reference the security group resource above
    ami: ami.id,
});

export const publicIp = server.publicIp;
export const publicHostName = server.publicDns;