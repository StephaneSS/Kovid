import { Server, DestinationProtocole } from '../custom-classes'

export const SERVERS: Server[] = [
    {
        //protocol: DestinationProtocole.FTP,
        name: 'toto_server',
        username: 'toto',
        host: 'toto_host',
        port: 1234,
    }, {
        //protocol: DestinationProtocole.FTP,
        name: 'server_of_titi',
        username: 'titi',
        host: 'host_of_titi',
        port: 22,
    }, {
        //protocol: DestinationProtocole.SFTP,
        name: 'nobody_server',
        username: 'nobody',
        host: 'host_of_nobody',
        port: 22,
    }
];
