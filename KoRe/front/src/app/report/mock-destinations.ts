import { DestinationProtocole, Destinations } from '../custom-classes'
import { SERVERS } from './mock-server';

export const DESTIATIONS: Destinations = {
    [DestinationProtocole.SMTP]: [
        {
            email: 'toto.toto@toto.to',
            object: 'totoSub'
        }
    ],
    [DestinationProtocole.FTP]: [
        {
            server: SERVERS[0],
            path: '~/folder'
        },
        {
            server: SERVERS[1],
            path: '~/my_costom_folder'
        }
    ],
    [DestinationProtocole.SFTP]: [],
    [DestinationProtocole.FOLDER]: [
        {
            path: '~/myFolder'
        }
    ]
};