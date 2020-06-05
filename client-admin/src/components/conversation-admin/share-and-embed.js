// Copyright (C) 2012-present, The Authors. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

import _ from "lodash";
import ConversationHasCommentsCheck from "./conversation-has-comments-check";
import Highlight from "react-highlight";
import React from "react";
import Url from "../../util/url";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Heading, Box, Flex } from "theme-ui";

@connect((state) => state.zid_metadata)
class ShareAndEmbed extends React.Component {
  constructEmbeddedOnMarkup() {
    return (
      <p>
        {"Embedded on: "}
        <a style={{ color: "black" }} target="blank" href={this.props.zid_metadata.parent_url}>
          {this.props.zid_metadata.parent_url}
        </a>
      </p>
    );
  }
  render() {
    const { match } = this.props;
    return (
      <div>
        <Heading
          as="h3"
          sx={{
            fontSize: [3, null, 4],
            lineHeight: "body",
            mb: [3, null, 4],
          }}
        >
          Distribute
        </Heading>
        <ConversationHasCommentsCheck
          conversation_id={match.params.conversation_id}
          strict_moderation={this.props.zid_metadata.strict_moderation}
        />
        <div>
          <p> Share </p>
          <p>
            <a target="blank" href={Url.urlPrefix + match.params.conversation_id}>
              {Url.urlPrefix + match.params.conversation_id}
            </a>
          </p>
        </div>
        <div>
          <p> Embed</p>
          <div>
            <Highlight>
              {"<div"}
              {" class='polis'"}
              {" data-conversation_id='" + match.params.conversation_id + "'>"}
              {"</div>\n"}
              {"<script async src='https://pol.is/embed.js'></script>"}
            </Highlight>
          </div>
          <p>
            This embed code can only be used to embed a single conversation.{" "}
            <Link to="integrate">I want to integrate pol.is on my entire site.</Link>
          </p>
          <div>{this.props.zid_metadata.parent_url ? this.constructEmbeddedOnMarkup() : ""}</div>
        </div>
      </div>
    );
  }
}

export default ShareAndEmbed;
