import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const ami = pulumi.output(aws.ec2.getAmi({
    filters: [
        {
            name: "root-device-type",
            values: ["ebs"],
        },
        {
            name: "virtualization-type",
            values: ["hvm"],
        },
    ],
    mostRecent: true,
    owners: ["amazon"],
    nameRegex: "^amzn2-ami-minimal-hvm-[0-9.]*-x86_64-ebs$"
}));

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

const server = new aws.ec2.Instance("Minecraft ec2", {
    instanceType: "t2.micro",
    vpcSecurityGroupIds: [ group.id ], // reference the security group resource above
    ami: ami.id,
});

export const publicIp = server.publicIp;
export const publicHostName = server.publicDns;
