package com.tbd.kore.service;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Optional;
import java.util.function.Consumer;

@Service
public class RemoteTaskService {

    @Value("${kore.job.ssh.identity:~/.ssh/id_rsa}")
    private String privateKey;

    private RemoteTaskService(){}

    public Session openSession(String user, String host, int port, Optional<String> password) throws JSchException {
        JSch jsch = new JSch();
        Session session = jsch.getSession(user, host, port);
        session.setConfig("StrictHostKeyChecking", "no");
        jsch.addIdentity(privateKey);
        password.ifPresent(session::setPassword);
        session.connect();
        return session;
    }

    public void closeSession(Session session){
        session.disconnect();
    }

    public int executeCommand(Session session, String command, Consumer<String> logger) throws JSchException, IOException {

        ChannelExec channelExec = (ChannelExec) session.openChannel("exec");

        channelExec.setCommand(command);
        channelExec.connect();

        InputStream in = channelExec.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        String line;
        while ((line = reader.readLine()) != null) {
            logger.accept(line);
        }

        int exitStatus = channelExec.getExitStatus();

        logger.accept("Remote execution finished with exit code "+exitStatus);
        return exitStatus;
    }

}
