import { DestinationProtocole, Destinations } from '../custom-classes'
import { SERVERS } from './mock-server';

export const DESTIATIONS: Destinations = {
    [DestinationProtocole.SMTP]: [
        {
          emailAddress: 'toto.toto@toto.to',
            subject: 'totoSub',
            active: true
        }
    ],
    [DestinationProtocole.FTP]: [
        {
            server: SERVERS[0],
            path: '~/folder',
            active: true
        },
        {
            server: SERVERS[1],
            path: '~/my_costom_folder',
            active: true
        }
    ],
    [DestinationProtocole.SFTP]: [],
    [DestinationProtocole.FOLDER]: [
        {
            path: '~/myFolder',
            active: true
        }
    ]
};
