# Teleport Email Plugin

The plugin allows teams to receive email notifications about new access requests.

## Setup

### Install the plugin

Get the plugin distribution.

```bash
$ curl -L https://get.gravitational.com/teleport-access-email-v7.1.0-linux-amd64-bin.tar.gz
$ tar -xzf teleport-access-email-v7.1.0-linux-amd64-bin.tar.gz
$ cd teleport-access-email
$ ./install
```

### Teleport User and Role

Using Web UI or `tctl` CLI utility, create the role `access-email` and the user `access-email` belonging to the role `access-email`. You may use the following YAML declarations.

#### Role

```yaml
kind: role
metadata:
  name: access-email
spec:
  allow:
    rules:
      - resources: ['access_request']
        verbs: ['list', 'read', 'update']
version: v4
```

#### User

```yaml
kind: user
metadata:
  name: access-email
spec:
  roles: ['access-email']
version: v2
```

### Generate the certificate

For the plugin to connect to Auth Server, it needs an identity file containing TLS/SSH certificates. This can be obtained with tctl:

```bash
$ tctl auth sign --auth-server=AUTH-SERVER:PORT --format=file --user=access-email --out=/var/lib/teleport/plugins/email/auth_id --ttl=8760h
```

Here, `AUTH-SERVER:PORT` could be `localhost:3025`, `your-in-cluster-auth.example.com:3025`, `your-remote-proxy.example.com:3080` or `your-teleport-cloud.teleport.sh:443`. For non-localhost connections, you might want to pass the `--identity=...` option to authenticate yourself to Auth Server.

### Save configuration file

By default, configuration file is expected to be at `/etc/teleport-email.toml`.

```toml
# /etc/teleport-email.toml
[teleport]
auth_server = "example.com:3025"                               # Teleport Auth/Proxy/Tunnel Server Address

# Identity file exported with tctl auth sign --format file
identity = "/var/lib/teleport/plugins/email/auth_id"    # Identity file

[mailgun]
domain = "sandboxbd81caddef744a69be0e5b544ab0c3bd.mailgun.org" # Mailgun domain name
private_key = "xoxb-11xx"                                      # Mailgun private key

# As an alternative, you can use SMTP server credentials:
#
# [smtp]
# host = "smtp.gmail.com"
# port = 587
# username = "username@gmail.com"
# password = ""
# password_file = "/var/lib/teleport/plugins/email/smtp_password"

[delivery]
sender = "noreply@example.com"   # From: email address
recipients = ["all@example.com"] # These recipients will receive all review requests

[log]
output = "stderr" # Logger output. Could be "stdout", "stderr" or "/var/lib/teleport/email.log"
severity = "INFO" # Logger severity. Could be "INFO", "ERROR", "DEBUG" or "WARN".
```

### Run the plugin

```bash
teleport-email start
```

If something bad happens, try to run it with `-d` option i.e. `teleport-email start -d` and attach the stdout output to the issue you are going to create.

## Building from source

To build the plugin from source you need Go >= 1.16 and `make`.

```bash
git clone https://github.com/gravitational/teleport-plugins.git
cd teleport-plugins/access/email
make
./build/teleport-email start
```
