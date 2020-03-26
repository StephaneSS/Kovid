import { DestinationProtocole, Destinations } from '../custom-classes'

export const DESTIATIONS: Destinations = {
    [DestinationProtocole.SMTP]: [
        {
            email: 'toto.toto@toto.to',
            object: 'totoSub'
        }
    ],
    [DestinationProtocole.FTP]: [
        {
            user: 'toto',
            host: 'toto_host',
            port: 1234,
            path: '~/folder'
        },
        {
            user: 'titi',
            host: 'host_of_titi',
            port: 22,
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